<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use App\User;

class testController extends Controller
{
	public function add_user(Request $r)
	{
	 	$validatedData = $r->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
        ]);
        $response = Http::asForm()->post(env("GOOGLE_RECAPTCHA_URL"), [
            'secret' => env("GOOGLE_RECAPTCHA_SECRET"),
            'response' => $r->recaptcha_token,
            'remoteip' => $r->ip(),
        ]);
        if( $response['success'] == true ){
            $user = User::create([
                'name' => $r->name,
                'email' => $r->email,
            ]);
            return response()->json(['message'=>'User added successfully.']);
        }else{
            return response()->json(['message'=>'The given data was invalid.','errors'=>['recaptcha_token'=>['reCAPTCHA verification failed.']]],422);
        }
	} 
}