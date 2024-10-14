<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PendaftaranSiswaResource extends JsonResource
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
            'email' => $this->email,
            'status' => $this->status,
            'siswa' => new SiswaResource($this->whenLoaded('siswa')),
            'tahunAjaran' => new TahunAjaranResource($this->whenLoaded('tahunAjaran')),
            'jurusan' => new JurusanResource($this->whenLoaded('jurusan')),
            'tanggal_pendaftaran' => (new Carbon($this->tanggal_pendaftaran))->format('Y-m-d'),
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'updated_at' => (new Carbon($this->updated_at))->format('Y-m-d'),
        ];
    }
}
