<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Http\Resources\IdentitasSekolahResource;
use App\Models\IdentitasSekolah;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InformasiSekolahController extends Controller
{
    public function index(){
        $data = IdentitasSekolah::first();
        return Inertia::render('Admin/Staff/Pengaturan/InformasiSekolah/Index', [
            'identitas' => new IdentitasSekolahResource($data)
        ]);
    }
}
