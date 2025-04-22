<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class SignupRequest extends FormRequest
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
                Rule::in(['client', 'host']),
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
            'phone' => [
                'required',
                'string',
                'regex:/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/',
            ],
            'birthday' => [
                'required',
                'string',
            //     // 'regex:/^([1-9]|0[1-9]|[12][0-9]|3[01])\/([1-9]|0[1-9]|1[0-2])\/(19|20)\d{2}$/',
            //     // function ($attribute, $value, $fail) {
            //     //     $parsedDate = \DateTime::createFromFormat('d/m/Y', $value);
            //     //     if (!$parsedDate) {
            //     //         $fail('Invalid date format');
            //     //         return;
            //     //     }

            //     //     $birthday = $parsedDate->format('Y-m-d');
            //     //     $minDate = date('Y-m-d', strtotime('-18 years'));

            //     //     if ($birthday > $minDate) {
            //     //         $fail('You must be at least 18 years old');
            //     //     }
            //     // },
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

            'phone.required' => 'Phone number is required',
            'phone.regex' => 'Invalid phone number',

            'birthday.required' => 'Birthday is required',
            'birthday.regex' => 'Birthday must be in the format dd/mm/yyyy',

            'email.required' => 'Email is required',
            'email.email' => 'Invalid email address',
            'email.unique' => 'This email is already registered',

            'password.required' => 'Password is required',
            'password.min' => 'Password must be at least 8 characters',
            'password.max' => 'Password cannot exceed 100 characters',
        ];
    }
}
