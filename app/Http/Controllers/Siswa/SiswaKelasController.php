<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use App\Http\Resources\SiswaResource;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SiswaKelasController extends Controller
{
    public function index(){
        $namaLengkap = request('namaLengkap');
        $user = Siswa::where('user_id', Auth::user()->id)->first();
        
        $query = Siswa::where('kelas_id', $user->kelas->id);
        if ($namaLengkap) {
            $query->where('nama_lengkap', 'LIKE', '%' . $namaLengkap . '%');
        }
        $siswa = $query->get();
        return Inertia::render('Admin/Siswa/Kelas/Index', [
            'siswa' => SiswaResource::collection($siswa),
            'queryParams' => request()->query() ?: null,
        ]);
    }
}
