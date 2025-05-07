<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Inertia\Inertia;
use Inertia\Response;

class ClientController extends Controller
{
    public function index(): Response
    {
        $clients = Client::query()->with(['user', 'accountType'])->get();
        return Inertia::render('admin/clients', [
            'clients' => $clients
        ]);

    }
}
