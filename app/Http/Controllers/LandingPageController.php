<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class LandingPageController extends Controller
{
    public function index(){
        return Inertia::render('Landing/Index');
    }

    public function fasilitas(){
        return Inertia::render('Landing/Fasilitas');
    }
}
