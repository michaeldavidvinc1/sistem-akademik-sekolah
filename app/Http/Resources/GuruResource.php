<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GuruResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user' => new UserResource($this->whenLoaded('user')),
            'nama_lengkap' => $this->nama_lengkap,
            'bidang_studi' => $this->bidang_studi,
            'alamat' => $this->alamat,
            'telepon' => $this->telepon,
            'tanggal_join' => $this->tanggal_join,
            'status' => $this->status,
            'jurusan' => new JurusanResource($this->whenLoaded('jurusan')),
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'updated_at' => (new Carbon($this->updated_at))->format('Y-m-d'),
        ];
    }
}
