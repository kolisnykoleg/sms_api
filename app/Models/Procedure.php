<?php

namespace App\Models;

use Psr\Container\ContainerInterface;


class Procedure
{
    private \PDO $db;

    public function __construct(ContainerInterface $container)
    {
        $this->db = $container->get('db');
    }

    public function create(array $data): int
    {
        $stmt = $this->db->prepare('
            INSERT INTO procedures (type, recipient, user_id)
            VALUES (:type, :recipient, :user_id)
        ');
        $stmt->execute([
            'type' => $data['type'],
            'recipient' => $data['recipient'],
            'user_id' => $data['user_id'],
        ]);
        return $this->db->lastInsertId();
    }

    public function delete(int $id)
    {
        $stmt = $this->db->prepare('
            DELETE FROM procedures WHERE id = :id
        ');
        $stmt->execute([
            'id' => $id,
        ]);
    }

    public function findByUser(int $userId): array
    {
        $stmt = $this->db->prepare('
            SELECT * FROM procedures WHERE user_id = :user_id
        ');
        $stmt->execute([
            'user_id' => $userId,
        ]);
        return $stmt->fetchAll();
    }
}