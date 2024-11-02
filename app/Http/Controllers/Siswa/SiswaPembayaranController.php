<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use App\Http\Resources\PembayaranSPPResource;
use App\Models\PembayaranSPP;
use App\Models\Siswa;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SiswaPembayaranController extends Controller
{
    public function index(){
        $deskripsi = request('deskripsi');
        $siswa = Siswa::where('user_id', Auth::user()->id)->first();
        $query = PembayaranSPP::with('siswa')->where('siswa_id', $siswa->id);
        if ($deskripsi) {
            $query->where('deskripsi', 'LIKE', '%' . $deskripsi . '%');
        }
        $data = $query->get();
        return Inertia::render('Admin/Siswa/Pembayaran/Index', [
            'pembayaran' => PembayaranSPPResource::collection($data),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    public function store(Request $request){
        $siswa = Siswa::where('user_id', Auth::user()->id)->first();
        $request->validate([
            'bukti_bayar' => 'required|image|mimes:jpg,jpeg,png,gif|max:2048',
            'jumlah' => 'required',
            'deskripsi' => 'required',
        ]);

        $path = $request->file('bukti_bayar')->store('pembayaran', 'public'); 

        PembayaranSPP::create([
            'siswa_id' => $siswa->id,
            'tanggal_pembayaran' => Carbon::now(),
            'jumlah' => $request->jumlah,
            'bukti_bayar' => $path,
            'deskripsi' => $request->deskripsi,
            'status_pembayaran' => 'belum lunas',
        ]);

        return to_route('siswa.pembayaran.list');
    }

    public function update(Request $request, $id){
        $request->validate([
            'bukti_bayar' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
            'jumlah' => 'required',
            'deskripsi' => 'required',
        ]);

        $data = PembayaranSPP::findOrFail($id);

        if ($request->hasFile('bukti_bayar')) {
            if ($data->bukti_bayar && Storage::disk('public')->exists($data->bukti_bayar)) {
                Storage::disk('public')->delete($data->bukti_bayar);
            }

            $path = $request->file('bukti_bayar')->store('pembayaran', 'public');

            $data->bukti_bayar = $path;
        }

        $data->jumlah = $request->jumlah;
        $data->deskripsi = $request->deskripsi;
        $data->save();

        return to_route('siswa.pembayaran.list');

    }

    public function destroy($id){
        $data = PembayaranSPP::findOrFail($id);
        Storage::disk('public')->delete($data->bukti_bayar);
        $data->delete();
    }
}
