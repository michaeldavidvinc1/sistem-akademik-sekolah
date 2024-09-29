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
            return redirect()->route('dashboard.page');
        }

        return back()->withErrors([
            'message' => 'Invalid credentials',
        ])->onlyInput('email');
    }
}
