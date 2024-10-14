<?php

namespace App\Http\Controllers;

use App\Http\Resources\JurusanResource;
use App\Models\Jurusan;
use App\Models\Pendaftaran;
use App\Models\Siswa;
use Carbon\Carbon;
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

    public function pendaftaran(){
        $data = Jurusan::all();
        return Inertia::render('Landing/Pendaftaran', [
            'jurusan' => JurusanResource::collection($data)
        ]);
    }

    public function pendaftaran_store(Request $request){
        $request->validate([
            'nama_lengkap' => 'required',
            'tanggal_lahir' => 'required',
            'tempat_lahir' => 'required',
            'alamat' => 'required',
            'telepon' => 'required',
            'email' => 'required',
            'jenis_kelamin' => 'required',
            'jurusan_id' => 'required',
        ]);

        $siswa = Siswa::create([
            'nama_lengkap' => $request->nama_lengkap,
            'tanggal_lahir' => $request->tanggal_lahir,
            'tempat_lahir' => $request->tempat_lahir,
            'alamat' => $request->alamat,
            'telepon' => $request->telepon,
            'tanggal_daftar' => Carbon::now(),
            'jenis_kelamin' => $request->jenis_kelamin,
            'jurusan_id' => $request->jurusan_id,
            'status' => 0,
        ]);

        Pendaftaran::create([
            'siswa_id' => $siswa->id,
            'email' => $request->email,
            'jurusan_id' => $request->jurusan_id,
            'tanggal_pendaftaran' => Carbon::now(),
            'status' => 'waiting',
        ]);
        
        return to_route('home');

    }
}
