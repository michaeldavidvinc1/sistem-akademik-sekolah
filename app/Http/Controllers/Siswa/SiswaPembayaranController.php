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
        $siswa = Siswa::where('user_id', Auth::user()->id)->first();
        $data = PembayaranSPP::with('siswa')->where('siswa_id', $siswa->id)->get();
        return Inertia::render('Admin/Siswa/Pembayaran/Index', [
            'pembayaran' => PembayaranSPPResource::collection($data)
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
}
