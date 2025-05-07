<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ApartmentRequest extends FormRequest
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
            'title' => 'required|string|min:5',
            'price' => 'required|numeric|min:1',
            'description' => 'required|string|min:10',
            'type' => 'required|in:apartment,house,mansion,hotel',
            
            'rooms' => 'required|integer|min:1',
            'bathrooms' => 'required|integer|min:0',
            'beds' => 'required|integer|min:0',
            'guests' => 'required|integer|min:1',
            'area' => 'required|integer|min:1',

            'country' => 'required|string',
            'city' => 'required|string',
            'address' => 'required|string',

            'check_in' => 'required|date|after_or_equal:today',
            'check_out' => 'required|date|after:check_in',

            'amenities' => 'nullable|array',
            'amenities.*' => 'string|distinct',

            'images' => 'nullable|array|max:10',
            'images.*' => 'image|mimes:jpg,jpeg,png,webp|max:5120',

            'existingImages' => 'nullable|array|max:10',
            'existingImages.*' => 'string',

            // a custom validation rule for total image count
            'totalImages' => ['required', 'integer', 'between:3,10'], // Custom rule placeholder
        ];
    }



    protected function prepareForValidation()
    {
        // Combine the counts of newImages and existingImages
        $newImagesCount = count($this->file('images', []));
        $existingImagesCount = count($this->input('existingImages', []));
        $totalImagesCount = $newImagesCount + $existingImagesCount;

        // Add the total image count to the request for validation
        $this->merge([
            'totalImages' => $totalImagesCount,
        ]);
    }



    public function messages(): array
    {
        return [
            'totalImages.between' => 'The total number of images (new and existing) must be between 3 and 10.',
        ];
    }
}
