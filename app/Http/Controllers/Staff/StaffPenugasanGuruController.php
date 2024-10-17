<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Http\Resources\GuruResource;
use App\Http\Resources\KelasResource;
use App\Http\Resources\MataPelajaranResource;
use App\Http\Resources\PenugasanGuruResource;
use App\Models\Guru;
use App\Models\Kelas;
use App\Models\KelasMataPelajaran;
use App\Models\MataPelajaran;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class StaffPenugasanGuruController extends Controller
{
    public function index()
    {
        $data = KelasMataPelajaran::with(['guru', 'mataPelajaran', 'kelas'])->get();
        return Inertia::render('Admin/Staff/Akademik/PenugasanGuru/Index', [
            'penugasan' => PenugasanGuruResource::collection($data)
        ]);
    }

    public function create()
    {
        $kelas = Kelas::all();
        $mataPelajaran = MataPelajaran::all();
        $guru = Guru::all();
        return Inertia::render('Admin/Staff/Akademik/PenugasanGuru/Create', [
            'kelas' => KelasResource::collection($kelas),
            'mataPelajaran' => MataPelajaranResource::collection($mataPelajaran),
            'guru' => GuruResource::collection($guru),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'kelas_id' => 'required',
            'mata_pelajaran_id' => 'required',
            'guru_id' => 'required',
        ]);

        $exists = KelasMataPelajaran::where('kelas_id', $request->kelas_id)
            ->where('mata_pelajaran_id', $request->mata_pelajaran_id)
            ->where('guru_id', $request->guru_id)
            ->exists();

        if ($exists) {
            throw ValidationException::withMessages([
                'message' => 'Guru ini sudah mengajar mata pelajaran ini di kelas tersebut.',
            ]);
        }


        KelasMataPelajaran::create([
            'kelas_id' => $request->kelas_id,
            'mata_pelajaran_id' => $request->mata_pelajaran_id,
            'guru_id' => $request->guru_id,
        ]);

        return to_route('staff.penugasan.index');
    }

    public function edit($id)
    {
        $data = KelasMataPelajaran::with(['guru', 'mataPelajaran', 'kelas'])->findOrFail($id);
        $kelas = Kelas::all();
        $mataPelajaran = MataPelajaran::all();
        $guru = Guru::all();
        return Inertia::render('Admin/Staff/Akademik/PenugasanGuru/Edit', [
            'kelas' => KelasResource::collection($kelas),
            'mataPelajaran' => MataPelajaranResource::collection($mataPelajaran),
            'guru' => GuruResource::collection($guru),
            'penugasan' => new PenugasanGuruResource($data)
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'kelas_id' => 'required',
            'mata_pelajaran_id' => 'required',
            'guru_id' => 'required',
        ]);
        $data = KelasMataPelajaran::with(['guru', 'mataPelajaran', 'kelas'])->findOrFail($id);
        $exists = KelasMataPelajaran::where('kelas_id', $request->kelas_id)
            ->where('mata_pelajaran_id', $request->mata_pelajaran_id)
            ->where('guru_id', $request->guru_id)
            ->exists();

        if ($exists) {
            throw ValidationException::withMessages([
                'message' => 'Guru ini sudah mengajar mata pelajaran ini di kelas tersebut.',
            ]);
        }


        $data->kelas_id = $request->kelas_id;
        $data->mata_pelajaran_id = $request->mata_pelajaran_id;
        $data->guru_id = $request->guru_id;
        $data->save();

        return to_route('staff.penugasan.index');
    }

    public function destroy($id){
        $data = KelasMataPelajaran::with(['guru', 'mataPelajaran', 'kelas'])->findOrFail($id);
        $data->delete();
    }
}
