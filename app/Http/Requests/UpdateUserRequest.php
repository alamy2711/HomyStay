<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
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
        $role = $this->user()->role; // Get the current user role.
        $rules = [
            'firstName' => [
                'required',
                'string',
                'min:2',
                'max:50',
                'regex:/^(?!\s*$)[A-Za-z\s]+$/',
            ],
            'lastName'  => [
                'required',
                'string',
                'min:2',
                'max:50',
                'regex:/^(?!\s*$)[A-Za-z\s]+$/',
            ],
            'phone' => [
                'nullable',
                'string',
                'regex:/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/',
            ],
            'birthday' => [
                'nullable',
                'string',
            ],
            'gender' => [
                'nullable',
                'in:male,female',
            ],
            'profilePicture' => [
                'nullable',
                'image',
                'mimes:jpeg,png,jpg',
                'max:2048',
            ],
        ];

        if ($role !== 'admin' && $role !== 'super_admin') {
            $rules['phone']    = [
                'required',
                'string',
                'regex:/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/',
            ];
            $rules['birthday'] = ['required', 'string'];
            $rules['gender']   = ['required', 'in:male,female'];
        }

        // No rule for "role" since it is not updateable
        return $rules;
    }

    /**
     * Custom messages for validation errors.
     *
     * These messages align with the messages used by Zod on the front end.
     *
     * @return array
     */
    public function messages()
    {
        return [
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

            'gender.required'         => 'Gender is required.',
            'gender.in'               => 'Gender must be either male or female.',

            'profilePicture.image'    => 'The profile picture must be an image.',
            'profilePicture.mimes'    => 'The profile picture must be a file of type: jpeg, png, jpg.',
            'profilePicture.max'      => 'The profile picture may not be greater than 2MB.',
        ];
    }
}
