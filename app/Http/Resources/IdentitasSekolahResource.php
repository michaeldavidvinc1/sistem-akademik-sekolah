<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class IdentitasSekolahResource extends JsonResource
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
            'nama_sekolah' => $this->nama_sekolah,
            'npsn' => $this->npsn,
            'nis' => $this->nis,
            'alamat' => $this->alamat,
            'kode_pos' => $this->kode_pos,
            'website' => $this->website,
            'email' => $this->email,
            'telepon' => $this->telepon,
            'logo' => $this->logo && !(str_starts_with($this->logo, 'http')) ?
            Storage::url($this->logo) : $this->logo,
        ];
    }
}
