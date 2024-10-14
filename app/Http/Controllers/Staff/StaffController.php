<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Http\Resources\StaffResource;
use App\Models\Staff;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StaffController extends Controller
{
    public function index(){
        $status = request('status');
        $joinDate = request('joinDate');
        $namaLengkap = request('namaLengkap');

        $query = Staff::with(['user']);

        if ($namaLengkap) {
            $query->where('nama_lengkap', 'LIKE', '%' . $namaLengkap . '%');
        }

        if ($joinDate) {
            $query->where('tanggal_join', $joinDate);
        }

        if ($status !== null) {
            $query->where('status', $status);
        }

        $data = $query->get();

        return Inertia::render('Admin/Staff/Pengguna/Staff/Index', [
            'staff' => StaffResource::collection($data),
        ]);
    }

    public function create(){
        return Inertia::render('Admin/Staff/Pengguna/Staff/Create');
    }

    public function store(Request $request){
        $request->validate([
            'email' => 'required|email:dns',
            'nama_lengkap' => 'required',
        ]);

        $user = User::create([
            'email' => $request->email,
            'name' => $request->nama_lengkap,
            'password' => bcrypt(12345),
            'role' => 'staff',
        ]);

        Staff::create([
            'user_id' => $user->id,
            'nama_lengkap' => $request->nama_lengkap,
            'tanggal_join' => Carbon::now(),
            'status' => 1,
        ]);

        return to_route('staff.staff.index');
    }

    public function edit($id){
        $staff = Staff::with('user')->findOrFail($id);
        return Inertia::render('Admin/Staff/Pengguna/Staff/Edit', [
            'staff' => new StaffResource($staff)
        ]);
    }

    public function update($id, Request $request){
        $request->validate([
            'email' => 'required|email:dns',
            'nama_lengkap' => 'required',
        ]);

        $staff = Staff::findOrFail($id);
        $user = User::findOrFail($staff->user_id);

        $user->name = $request->nama_lengkap;
        $user->email = $request->email;
        $user->save();

        $staff->nama_lengkap = $request->nama_lengkap;
        $staff->save();

        return to_route('staff.staff.index');
    }

    public function destroy($id){
        $staff = Staff::findOrFail($id);
        $staff->delete();
    }

    public function change_status($id){
        $data = Staff::findOrFail($id);

        $data->status = !$data->status;
        $data->save();

    }

    public function change_password(Request $request, $id){
        $request->validate([
            'password' => 'required',
            'confirm_password' => 'required|same:password',
        ]);
        $guru = Staff::findOrFail($id);
        $user = User::findOrFail($guru->user_id);
        $user->password = bcrypt($request->password);
        $user->save();

        return to_route('staff.guru.index');
    }
}
