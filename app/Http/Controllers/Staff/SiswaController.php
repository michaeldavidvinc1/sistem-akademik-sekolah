<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiswaController extends Controller
{
    public function index(){
        return Inertia::render('Admin/Staff/Pengguna/Siswa/Index');
    }
}
