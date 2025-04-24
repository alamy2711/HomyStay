<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Apartment;

class ApartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $apartments = Apartment::all();
        return response()->json($apartment);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // this method return the view with the form
        // return view('apartments.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreApartmentRequest $request)
    {
        //validate the request data 
        $validatedData = $request->validated();

        try{
            //Create the apartement
            Apartment::create($validatedData);
            echo "Apartment created successfully!";
            //Redirect to index page 
            return redirect()->route('apartments.index')->with('success', 'Apartment created successfully');
        }
        catch(\Exception $e){
            echo "An error occurred: " . $e->getMessage();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            // Find the apartment by ID
            $apartment = Apartment::findOrFail($id);

            // Return the apartment (JSON response for API)
            return response()->json($apartment); // If used in an API

        } catch (\Exception $e) {
            return response()->json(['error' => 'Apartment not found'], 404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        try{
            //Retrieve the specific apartment by its ID
            $apartment = Apartment ::findOrFail($id);

            //Return the apartment data as JSON response
            return response->json($apartment); 
        }
        catch (\Exception $e) {
            return response()->json(['error' => 'Apartment not edited'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateApartmentRequest $request, string $id)
    {
        //validate the request data 
        $validatedData = $request->validated();
        
        if($validatedData->fails()){
            return response()->json($validatedData->errors(), 422);
        }

        try{
            //Find the apartment by ID
            $apartment = Apartment::findOrFail($id);

            //Update apartment fields
            Apartment::update($validatedData);
            return response()->json(['message' => 'Apartment updated successfully!', 'data' => $apartment], 200);
        }
        catch(\Exception $e){
            return response()->json(['error' => 'Failed to update the apartment.', 'data' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try{
            //Find the apartment by ID
            $apartment = Apartment::findOrFail($id);

            //Check the authorization
            $this->authorize('delete', $apartment);

            //Delete the apartment
            $apartment->delete();

            //Return a success response
            return response()->json(['message' => 'Apartment deleted successfully!'], 200);
        }
        catch(\Illuminate\Auth\Access\AuthorizationException $e){
            return response()->json(['error' => 'Unauthorized to delete this apartment.', 403]);
        }
        catch(\Exception $e){
            return response()->json(['error' => 'Failed to delete the apartment.', 'details' => $e->getMessage()], 500);
        }
    }
}
