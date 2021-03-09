<?php

namespace App\Models;

use Psr\Container\ContainerInterface;


class User
{
    private \PDO $db;

    public function __construct(ContainerInterface $container)
    {
        $this->db = $container->get('db');
    }

    public function all(): array
    {
        $stmt = $this->db->query('
            SELECT * FROM users ORDER BY id DESC
        ');
        return $stmt->fetchAll();
    }

    public function create(array $data): int
    {
        $stmt = $this->db->prepare('
            INSERT INTO users (email, phone, api_key, description)
            VALUES (:email, :phone, :api_key, :description)
        ');
        $stmt->execute([
            'email' => $data['email'],
            'phone' => $data['phone'],
            'api_key' => $data['api_key'],
            'description' => $data['description'],
        ]);
        return $this->db->lastInsertId();
    }

    public function update(array $data)
    {
        $stmt = $this->db->prepare('
            UPDATE users SET
                email = :email,
                phone = :phone,
                api_key = :api_key,
                description = :description
            WHERE id = :id
        ');
        $stmt->execute([
            'email' => $data['email'],
            'phone' => $data['phone'],
            'api_key' => $data['api_key'],
            'description' => $data['description'],
            'id' => $data['id'],
        ]);
    }

    public function delete(int $id)
    {
        $stmt = $this->db->prepare('
            DELETE FROM users WHERE id = :id
        ');
        $stmt->execute([
            'id' => $id,
        ]);
    }

    public function find(array $params): array
    {
        $sql = 'SELECT * FROM users WHERE ' . join(' AND ', array_map(function ($key) {
                return "$key = :$key";
            }, array_keys($params)));
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }

    public function generateApiKey(): string
    {
        return bin2hex(random_bytes(8));
    }
}