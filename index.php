<?php

require_once __DIR__ . '/vendor/autoload.php';

use DI\Container;
use Slim\Factory\AppFactory;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Tuupola\Middleware\HttpBasicAuthentication;
use Slim\Middleware\Authentication\SimpleTokenAuthentication;
use App\Controllers\User;
use App\Controllers\Message;
use App\Controllers\Admin;
use App\Models\User as UserModel;


$container = new Container();

$container->set('db', function () {
    return new PDO('sqlite:db.sqlite', null, null, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
});

$container->set('userModel', new UserModel($container));

AppFactory::setContainer($container);
$app = AppFactory::create();

$app->addErrorMiddleware(true, false, false);

$app->add(function (Request $request, RequestHandler $handler) {
    $contentType = $request->getHeaderLine('Content-Type');
    if (strstr($contentType, 'application/json')) {
        $contents = json_decode(file_get_contents('php://input'), true);
        if (json_last_error() === JSON_ERROR_NONE) {
            $request = $request->withParsedBody($contents);
        }
    }
    return $handler->handle($request);
});

$app->group('/api', function (Group $group) {
    $group->post('/sms', Message::class . ':sms');
})->add(new SimpleTokenAuthentication($container, [
    'validate' => function ($apiKey) use ($container) {
        $db = $container->get('db');
        $stmt = $db->prepare('
            SELECT * FROM users WHERE api_key = :api_key
        ');
        $stmt->execute([
            'api_key' => $apiKey,
        ]);
        return (bool)count($stmt->fetchAll());
    },
    'secure' => false,
]));

$app->add(new HttpBasicAuthentication([
    'path' => [
        '/admin',
        '/user',
        '/message',
    ],
    'users' => [
        'admin' => 'admin',
    ],
    'secure' => false,
]));

$app->get('/admin', Admin::class . ':index');

$app->group('/user', function (Group $group) {
    $group->post('/create', User::class . ':create');
    $group->post('/update', User::class . ':update');
    $group->get('/delete/{id:[0-9]+}', User::class . ':delete');
    $group->get('/list', User::class . ':list');
    $group->post('/procedure/create', User::class . ':createProcedure');
    $group->get('/procedure/delete/{id:[0-9]+}', User::class . ':deleteProcedure');
    $group->get('/procedure/list/{user_id:[0-9]+}', User::class . ':getProcedureList');
});

$app->group('/message', function (Group $group) {
    $group->get('/pending', Message::class . ':pending');
    $group->get('/sent', Message::class . ':sent');
    $group->get('/received', Message::class . ':received');
    $group->get('/delete/pending/{id:[0-9]+}', Message::class . ':deletePending');
});

$app->run();
