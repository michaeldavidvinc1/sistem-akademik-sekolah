<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Http\Resources\JurusanResource;
use App\Http\Resources\MataPelajaranResource;
use App\Models\Jurusan;
use App\Models\MataPelajaran;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MataPelajaranController extends Controller
{
    public function index()
    {
        $data = MataPelajaran::with(['jurusan'])->get();
        return Inertia::render('Admin/Staff/Akademik/Mapel/Index', [
            'mataPelajaran' => MataPelajaranResource::collection($data)
        ]);
    }

    public function create()
    {
        $data = Jurusan::all();
        return Inertia::render('Admin/Staff/Akademik/Mapel/Create', [
            'jurusan' => JurusanResource::collection($data)
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'kode_mata_pelajaran' => 'required',
            'nama_mata_pelajaran' => 'required',
            'jurusan_id' => 'required',
        ]);

        MataPelajaran::create([
            'kode_mata_pelajaran' => $request->kode_mata_pelajaran,
            'nama_mata_pelajaran' => $request->nama_mata_pelajaran,
            'jurusan_id' => $request->jurusan_id,
        ]);

        return to_route('staff.mapel.index');
    }

    public function edit($id)
    {
        $jurusan = Jurusan::all();
        $data = MataPelajaran::with(['jurusan'])->findOrFail($id);
        return Inertia::render('Admin/Staff/Akademik/Mapel/Edit', [
            'mataPelajaran' => new MataPelajaranResource($data),
            'jurusan' => JurusanResource::collection($jurusan),
        ]);
    }

    public function update(Request $request, $id)
    {

        $data =   $request->validate([
            'kode_mata_pelajaran' => 'required',
            'nama_mata_pelajaran' => 'required',
            'jurusan_id' => 'required',
        ]);

        $mapel = MataPelajaran::findOrFail($id);

        $mapel->update($data);

        return to_route('staff.mapel.index');
    }

    public function destroy($id)
    {
        $mapel = MataPelajaran::findOrFail($id);
        $mapel->delete();
    }
}
