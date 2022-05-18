<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class AdminUserController extends Controller
{
    private $user;
    public function __construct(User $user)
    {
        $this->user = $user;
    }
    public function users()
    {
        $users = $this->user->all();
        Redis::set('users', $users);
        if($users){
            return response()->json($users, 200);
        }else{
            return response()->json([
                'error' => true,
                'msg' => 'Get Data Fail'
            ]);
        }

    }
    public function test()
    {
        $user = Redis::get('users');
        return response()->json($user, 200);
    }
}
