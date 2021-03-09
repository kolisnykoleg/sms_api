<?php

namespace App\Models;

use Psr\Container\ContainerInterface;


class Message
{
    private \PDO $db;

    public function __construct(ContainerInterface $container)
    {
        $this->db = $container->get('db');
    }

    public function save(array $data)
    {
        $stmt = $this->db->prepare('
            INSERT INTO users_messages (user_id, message_id, type)
            VALUES (:user_id, :message_id, :type)
        ');
        $stmt->execute([
            'user_id' => $data['user_id'],
            'message_id' => $data['message_id'],
            'type' => $data['type'],
        ]);
    }

    public function sendSMS(array $data): int
    {
        exec("gammu-smsd-inject TEXT $data[phone] -text \"$data[message]\" -len 400", $output, $code);
        if ($code) {
            throw new \Exception(join("\n", $output), $code);
        }
        return array_slice(explode(' ', end($output)), -1)[0];
    }

    public function deletePending(int $id)
    {
        $this->db->beginTransaction();
        $stmt = $this->db->prepare('DELETE FROM outbox WHERE ID = :id');
        $stmt->execute(['id' => $id]);
        $stmt = $this->db->prepare('DELETE FROM outbox_multipart WHERE ID = :id');
        $stmt->execute(['id' => $id]);
        $stmt = $this->db->prepare('DELETE FROM users_messages WHERE message_id = :id');
        $stmt->execute(['id' => $id]);
        $this->db->commit();
    }

    public function pendingList(): array
    {
        $stmt = $this->db->query('
            SELECT
                o.ID id,
                u.phone sender,
                o.DestinationNumber recipient,
                o.TextDecoded message
            FROM outbox o
            JOIN users_messages um ON o.ID = um.message_id
            JOIN users u ON um.user_id = u.id
        ');
        return $stmt->fetchAll();
    }

    public function sentList(): array
    {
        $stmt = $this->db->query('
            SELECT 
                s.ID id,
                u.phone sender,
                s.DestinationNumber recipient,
                s.UDH udh,
                s.TextDecoded message,
                s.SendingDateTime date,
                s.Status status
            FROM sentitems s
            JOIN users_messages um ON s.ID = um.message_id
            JOIN users u ON um.user_id = u.id
            ORDER BY id DESC
        ');
        return $stmt->fetchAll();
    }

    public function receivedList(): array
    {
        $stmt = $this->db->query('
            SELECT
                i.ID id,
                i.SenderNumber sender,
                i.TextDecoded message,
                i.ReceivingDateTime date
            FROM inbox i
            ORDER BY id DESC
        ');
        return $stmt->fetchAll();
    }
}