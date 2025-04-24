<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => 'required | string | min:3 | max:255',
            'last_name' => 'required | string | min:3 | max:255',
            'phone' => 'required | string | min:10 | max:15',
            'birthday' => 'required | date | date_format:DD/MM/YYYY',
            'email' => 'required | email | unique:users',
            'password' => 'required | string | min:6 | max:20 | confirmed',
            'role' => 'required | in:client, host',
        ];
    }
}
