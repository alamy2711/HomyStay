<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'string', 'email', 'max:255'],
            'password' => [
                'required',
                'string',
                Password::min(8)
                    ->max(100)
            ],
            'rememberMe' => ['sometimes', 'boolean'],
        ];
    }

    public function messages()
    {
        return [
            'email.required' => 'Email is required',
            'email.email' => 'Invalid email address',
            'password.required' => 'Password is required',
            'password.min' => 'Password must be at least 8 characters',
            'password.max' => 'Password cannot exceed 100 characters',
        ];
    }
}
