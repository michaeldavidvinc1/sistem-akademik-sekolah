<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Models\Informasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StaffInformasiController extends Controller
{
    public function store(Request $request){
        $request->validate([
            'pesan' => 'required',
            'tujuan' => 'required',
        ]);

        Informasi::create([
            'user_id' => Auth::user()->id,
            'pesan' => $request->pesan,
            'tujuan' => $request->tujuan,
        ]);

        return to_route('dashboard.staff');
    }

    public function destroy($id){
        $data = Informasi::findOrFail($id);
        $data->delete();
    }
}
