<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Http\Resources\TahunAjaranResource;
use App\Models\TahunAjaran;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TahunAjaranController extends Controller
{
    public function index(){
        $data = TahunAjaran::all();
        return Inertia::render('Admin/Staff/Pengaturan/TahunAjaran/Index', [
            'tahunAjaran' => TahunAjaranResource::collection($data)
        ]);
    }

    public function create(){
        return Inertia::render('Admin/Staff/Pengaturan/TahunAjaran/Create');
    }

    public function store(Request $request){
        $request->validate([
            'tahun_ajaran' => 'required',
            'tanggal_mulai' => 'required',
            'tanggal_selesai' => 'required',
        ]);

        TahunAjaran::create([
            'tahun_ajaran' => $request->tahun_ajaran,
            'tanggal_mulai' => $request->tanggal_mulai,
            'tanggal_selesai' => $request->tanggal_selesai,
        ]);

        return to_route('staff.tahun-ajaran.index');
    }

    public function edit($id){
        $data = TahunAjaran::findOrFail($id);
        return Inertia::render('Admin/Staff/Pengaturan/TahunAjaran/Edit', [
            'tahunAjaran' => new TahunAjaranResource($data)
        ]);
    }

    public function update(Request $request, $id){
        
        $data = $request->validate([
            'tahun_ajaran' => 'required',
            'tanggal_mulai' => 'required',
            'tanggal_selesai' => 'required',
        ]);

        $tahunAjaran = TahunAjaran::findOrFail($id);

        $tahunAjaran->update($data);

        return to_route('staff.tahun-ajaran.index');
    }

    public function destroy($id){
        $tahunAjaran = TahunAjaran::findOrFail($id);
        $tahunAjaran->delete();
    }
}
