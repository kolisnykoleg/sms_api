<?php

namespace App\Controllers;

use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Psr7\Stream;


class Admin
{
    public function __construct(ContainerInterface $container)
    {
        
    }

    public function index(Request $request, Response $response): Response
    {
        $html = file_get_contents(__DIR__ . '/../../index.html');
        $response->getBody()->write($html);
        return $response;
    }
}