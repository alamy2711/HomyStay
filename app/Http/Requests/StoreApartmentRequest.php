<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreApartmentRequest extends FormRequest
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
            'host_id' => 'required|exists:hosts,id',
            'title' => 'required|string|max:255',
            'type' => 'required|in:apartment,house,mansion,hotel',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'address' => 'required|string|max:255',
            'nbr_room' => 'required|integer|min:1',
            'nbr_bed' => 'required|integer|min:1',
            'nbr_bathroom' => 'required|integer|min:1',
            'nbr_guest' => 'required|integer|min:1',
            'check-in' => 'required|date',
            'check-out' => 'required|date|after:check-in',
            'status' => 'required|boolean',
            'rating' => 'nullable|numeric|min:0|max:5',
        ];
    }
}
