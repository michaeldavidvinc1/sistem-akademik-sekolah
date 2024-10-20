<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Http\Resources\JenisPenilaianResource;
use App\Models\JenisPenilaian;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JenisPenilaianController extends Controller
{
    public function index(){
        $data = JenisPenilaian::all();
        return Inertia::render('Admin/Staff/Akademik/KategoriNilai/Index', [
            'jenisPenilaian' => JenisPenilaianResource::collection($data)
        ]);
    }

    public function create(){
        return Inertia::render('Admin/Staff/Akademik/KategoriNilai/Create');
    }

    public function store(Request $request){
        $request->validate([
            'kode_jenis_penilaian' => 'required',
            'deskripsi' => 'required',
        ]);

        JenisPenilaian::create([
            'kode_jenis_penilaian' => $request->kode_jenis_penilaian,
            'deskripsi' =>  $request->deskripsi,
        ]);

        return to_route('staff.jenis-penilaian.index');
    }

    public function edit($id){
        $data = JenisPenilaian::findOrFail($id);
        return Inertia::render('Admin/Staff/Akademik/KategoriNilai/Edit', [
            'jenisPenilaian' => new JenisPenilaianResource($data)
        ]);
    }

    public function update(Request $request, $id){
        $data = $request->validate([
            'kode_jenis_penilaian' => 'required',
            'deskripsi' => 'required',
        ]);
        $jenisPenilaian = JenisPenilaian::findOrFail($id);

        $jenisPenilaian->update($data);

        return to_route('staff.jenis-penilaian.index');

    }

    public function destroy($id){
        $jenisPenilaian = JenisPenilaian::findOrFail($id);
        $jenisPenilaian->delete();
    }

}
