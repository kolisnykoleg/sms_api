<?php

namespace App\Controllers;

use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Models\User as UserModel;
use App\Models\Procedure as ProcedureModel;


class User
{
    private UserModel $user;

    public function __construct(ContainerInterface $container, UserModel $user, ProcedureModel $procedure)
    {
        $this->user = $user;
        $this->procedure = $procedure;
    }

    public function create(Request $request, Response $response): Response
    {
        $data = $request->getParsedBody();
        $data['api_key'] = $this->user->generateApiKey();
        $userId = $this->user->create($data);
        $response->getBody()->write(json_encode([
            'id' => $userId,
            'api_key' => $data['api_key'],
        ]));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function update(Request $request, Response $response): Response
    {
        $data = $request->getParsedBody();
        $this->user->update($data);
        return $response;
    }

    public function delete(Request $request, Response $response, $args): Response
    {
        $this->user->delete($args['id']);
        return $response;
    }

    public function list(Request $request, Response $response): Response
    {
        $users = $this->user->all();
        $response->getBody()->write(json_encode($users));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function createProcedure(Request $request, Response $response): Response
    {
        $data = $request->getParsedBody();
        $procedureId = $this->procedure->create($data);
        $response->getBody()->write(json_encode(['id' => $procedureId]));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function deleteProcedure(Request $request, Response $response, $args): Response
    {
        $this->procedure->delete($args['id']);
        return $response;
    }

    public function getProcedureList(Request $request, Response $response, $args): Response
    {
        $procedureList = $this->procedure->findByUser($args['user_id']);
        $response->getBody()->write(json_encode($procedureList));
        return $response->withHeader('Content-Type', 'application/json');
    }
}