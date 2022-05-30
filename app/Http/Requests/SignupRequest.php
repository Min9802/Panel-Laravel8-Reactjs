<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class SignupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'username' => 'required|min:6|max:16|unique:users',
            'name' => 'required|min:6|max:16',
            'email' => 'required|email|max:100|unique:users',
            'password' => 'required|string|confirmed|min:6',
        ];
    }
    public function messages()
    {
       return [
           'username.required' => "UserName required",
           'username.min' => 'UserName min 6 character',
           'username.max' => 'UserName max 16 character',
           'username.unique' => 'UserName have been taken!',
           'name.required' => 'Name required',
           'name.min' => 'UserName min 6 character',
           'name.max' => 'UserName max 16 character',
           'email.required' => "Email required",
           'email.email' => "Require email",
           'email.max' => "Email max 100 character",
           'email.unique' => "Email have been taken!",
           'password.required' => "Password required",
           'password.confirmed' => "Password not confirmed ",
           'password.min' => "Password min 6 character",
       ];
    }
    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => $validator->errors(),
        ],422));
    }
}
