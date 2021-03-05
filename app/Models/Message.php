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
}