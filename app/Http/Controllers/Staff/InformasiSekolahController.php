<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Http\Resources\IdentitasSekolahResource;
use App\Models\IdentitasSekolah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class InformasiSekolahController extends Controller
{
    public function index(){
        $data = IdentitasSekolah::first();
        return Inertia::render('Admin/Staff/Pengaturan/InformasiSekolah/Index', [
            'identitas' => new IdentitasSekolahResource($data)
        ]);
    }

    public function update(Request $request){
        $request->validate([
            'logo' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
            'nama_sekolah' => 'required',
            'npsn' => 'required',
            'nis' => 'required',
            'alamat' => 'required',
            'kode_pos' => 'required',
            'website' => 'required',
            'email' => 'required',
            'telepon' => 'required',
        ]);

        $identitas = IdentitasSekolah::first();

        if ($request->hasFile('logo')) {
            if ($identitas->logo && Storage::disk('public')->exists($identitas->logo)) {
                Storage::disk('public')->delete($identitas->logo);
            }

            $path = $request->file('logo')->store('images', 'public');

            $identitas->logo = $path;
        }

        $identitas->nama_sekolah = $request->nama_sekolah;
        $identitas->npsn = $request->npsn;
        $identitas->nis = $request->nis;
        $identitas->alamat = $request->alamat;
        $identitas->kode_pos = $request->kode_pos;
        $identitas->website = $request->website;
        $identitas->email = $request->email;
        $identitas->telepon = $request->telepon;

        $identitas->save();

    }
}
