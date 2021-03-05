<?php

namespace App\Controllers;

use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Models\Message as MessageModel;
use App\Models\User as UserModel;


class Message
{
    private MessageModel $message;
    private UserModel $user;

    public function __construct(ContainerInterface $container, MessageModel $message, UserModel $user)
    {
        $this->message = $message;
        $this->user = $user;
    }

    public function sms(Request $request, Response $response)
    {
        $data = $data = $request->getParsedBody();
        $response->getBody()->write("Send message {$data['message']} to {$data['phone']}\n");
        return $response;
    }
}