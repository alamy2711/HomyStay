<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class CreateAdminRequest extends FormRequest
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
            'role' => [
                'required',
                Rule::in(['admin']),
            ],
            'firstName' => [
                'required',
                'string',
                'min:2',
                'max:50',
                'regex:/^(?!\s*$)[A-Za-z\s]+$/',
            ],
            'lastName' => [
                'required',
                'string',
                'min:2',
                'max:50',
                'regex:/^(?!\s*$)[A-Za-z\s]+$/',
            ],

            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                'unique:users,email',
            ],
            'password' => [
                'required',
                'string',
                Password::min(8)
                    ->max(100)
                // ->letters()
                // // ->mixedCase()
                // ->numbers()
                // ->symbols(),
            ],
        ];
    }

    public function messages()
    {
        return [
            'role.required' => 'Please make a selection to continue',
            'role.in' => 'Please select a valid role',

            'firstName.required' => 'First name is required',
            'firstName.min' => 'First name must be at least 2 characters',
            'firstName.max' => 'First name cannot exceed 50 characters',
            'firstName.regex' => 'Only letters allowed',

            'lastName.required' => 'Last name is required',
            'lastName.min' => 'Last name must be at least 2 characters',
            'lastName.max' => 'Last name cannot exceed 50 characters',
            'lastName.regex' => 'Only letters allowed',

            'email.required' => 'Email is required',
            'email.email' => 'Invalid email address',
            'email.unique' => 'This email is already registered',

            'password.required' => 'Password is required',
            'password.min' => 'Password must be at least 8 characters',
            'password.max' => 'Password cannot exceed 100 characters',
        ];
    }
}
