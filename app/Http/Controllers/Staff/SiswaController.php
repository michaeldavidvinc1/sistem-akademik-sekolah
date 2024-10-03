<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Http\Resources\SiswaResource;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiswaController extends Controller
{
    public function index(){
        $data = Siswa::with(['user', 'kelas', 'jurusan'])->get();
        return Inertia::render('Admin/Staff/Pengguna/Siswa/Index', [
            'siswa' => SiswaResource::collection($data)
        ]);
    }
}
