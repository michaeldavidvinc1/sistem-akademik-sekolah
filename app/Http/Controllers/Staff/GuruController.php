<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Http\Resources\GuruResource;
use App\Http\Resources\JurusanResource;
use App\Models\Guru;
use App\Models\Jurusan;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GuruController extends Controller
{
    public function index(){
        $jurusanId = request('jurusan_id');
        $status = request('status');
        $joinDate = request('joinDate');

        $query = Guru::with(['user', 'jurusan']);

        if ($jurusanId) {
            $query->where('jurusan_id', $jurusanId);
        }

        if ($joinDate) {
            $query->where('tanggal_join', $joinDate);
        }

        if ($status !== null) {
            $query->where('status', $status);
        }

        $data = $query->get();

        $jurusan = Jurusan::all();

        return Inertia::render('Admin/Staff/Pengguna/Guru/Index', [
            'guru' => GuruResource::collection($data),
            'queryParams' => request()->query() ?: null,
            'jurusan' => JurusanResource::collection($jurusan),
        ]);
    }

    public function create(){
        $jurusan = Jurusan::all();
        return Inertia::render('Admin/Staff/Pengguna/Guru/Create', [
            'jurusan' => JurusanResource::collection($jurusan),
        ]);
    }

    public function store(Request $request){
        $request->validate([
            'email' => 'required|email:dns',
            'jurusan_id' => 'required',
            'nama_lengkap' => 'required',
            'bidang_studi' => 'required',
            'alamat' => 'required',
            'telepon' => 'required',
        ]);
        $user = User::create([
            'email' => $request->email,
            'name' => $request->nama_lengkap,
            'password' => bcrypt(12345),
            'role' => 'guru',
        ]);

        Guru::create([
            'user_id' => $user->id,
            'jurusan_id' => $request->jurusan_id,
            'nama_lengkap' => $request->nama_lengkap,
            'bidang_studi' => $request->bidang_studi,
            'alamat' => $request->alamat,
            'telepon' => $request->telepon,
            'tanggal_join' => Carbon::now(),
            'status' => 1,
        ]);

        return to_route('staff.guru.index');
    }

    public function edit($id){
        $guru = Guru::with(['user', 'jurusan'])->findOrFail($id);
        $jurusan = Jurusan::all();
        return Inertia::render('Admin/Staff/Pengguna/Guru/Edit', [
            'jurusan' => JurusanResource::collection($jurusan),
            'guru' => new GuruResource($guru)
        ]);
    }

    public function update($id, Request $request){
        $request->validate([
            'email' => 'required|email:dns',
            'jurusan_id' => 'required',
            'nama_lengkap' => 'required',
            'bidang_studi' => 'required',
            'alamat' => 'required',
            'telepon' => 'required',
        ]);
        $guru = Guru::findOrFail($id);
        $user = User::findOrFail($guru->user_id);

        $user->name = $request->nama_lengkap;
        $user->email = $request->email;
        $user->save();

        $guru->nama_lengkap = $request->nama_lengkap;
        $guru->jurusan_id = $request->jurusan_id;
        $guru->bidang_studi = $request->bidang_studi;
        $guru->alamat = $request->alamat;
        $guru->telepon = $request->telepon;
        $guru->save();

        return to_route('staff.guru.index');
    }

    public function destroy($id){
        $guru = Guru::findOrFail($id);
        $guru->delete();
    }

    public function change_password($id, Request $request){
        $guru = Guru::findOrFail($id);
        return Inertia::render('Admin/Staff/Pengguna/Guru/ChangePassword', [
            'guru' => new GuruResource($guru)
        ]);
    }
}
