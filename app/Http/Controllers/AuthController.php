<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function login_page(){
        return Inertia::render('Auth/Login');
    }

    public function login(Request $request){
        $request->validate([
            'email' => 'required|email:dns',
            'password' => 'required',
        ]);

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            
            $request->session()->regenerate();
            if(Auth::user()->role === 'staff'){
                return redirect()->route('dashboard.staff');
            } else if(Auth::user()->role === 'guru'){
                return redirect()->route('dashboard.guru');
            } else if(Auth::user()->role === 'siswa'){
                return redirect()->route('dashboard.siswa');
            } 
        }

        return back()->withErrors([
            'message' => 'Invalid credentials',
        ])->onlyInput('email');
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return to_route('login');
    }
}
