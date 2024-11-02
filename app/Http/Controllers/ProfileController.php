<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index(){
        return Inertia::render("Admin/Profile");
    }

    public function update_profile(Request $request){
        $request->validate([
            'name' => 'required',
            'email' => 'required|email:dns',
        ]);

        $user = User::findOrFail(Auth::user()->id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->save();

    }

    public function change_password(Request $request){
        $request->validate([
            'password' => 'required',
            'confirm_password' => 'required|same:password',
        ]);

        $user = User::findOrFail(Auth::user()->id);
        $user->password = bcrypt($request->password);
        $user->save();
        
    }
}
