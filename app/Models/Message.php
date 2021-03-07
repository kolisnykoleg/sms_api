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
}