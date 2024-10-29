<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Http\Resources\KepalaSekolahResource;
use App\Models\KepalaSekolah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class KepalaSekolahController extends Controller
{
    public function index(){
        $data = KepalaSekolah::first();
        return Inertia::render('Admin/Staff/Pengaturan/KepalaSekolah/Index', [
            'kepalaSekolah' => new KepalaSekolahResource($data)
        ]);
    }

    public function update(Request $request){
        $request->validate([
            'foto' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
            'tanda_tangan' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
            'nama_lengkap' => 'required',
            'nip' => 'required',
            'jenis_kelamin' => 'required',
            'tanggal_lahir' => 'required',
            'tempat_lahir' => 'required',
            'alamat' => 'required',
            'email' => 'required',
            'telepon' => 'required',
        ]);

        $kepalaSekolah = KepalaSekolah::first();

        if ($request->hasFile('foto')) {
            if ($kepalaSekolah->foto && Storage::disk('public')->exists($kepalaSekolah->foto)) {
                Storage::disk('public')->delete($kepalaSekolah->foto);
            }

            $path = $request->file('foto')->store('images', 'public');

            $kepalaSekolah->foto = $path;
        }

        if ($request->hasFile('tanda_tangan')) {
            if ($kepalaSekolah->tanda_tangan && Storage::disk('public')->exists($kepalaSekolah->tanda_tangan)) {
                Storage::disk('public')->delete($kepalaSekolah->tanda_tangan);
            }

            $path = $request->file('tanda_tangan')->store('images', 'public');

            $kepalaSekolah->tanda_tangan = $path;
        }

        $kepalaSekolah->nama_lengkap = $request->nama_lengkap;
        $kepalaSekolah->nip = $request->nip;
        $kepalaSekolah->jenis_kelamin = $request->jenis_kelamin;
        $kepalaSekolah->tanggal_lahir = $request->tanggal_lahir;
        $kepalaSekolah->tempat_lahir = $request->tempat_lahir;
        $kepalaSekolah->alamat = $request->alamat;
        $kepalaSekolah->telepon = $request->telepon;
        $kepalaSekolah->email = $request->email;
        $kepalaSekolah->save();
    }
}
