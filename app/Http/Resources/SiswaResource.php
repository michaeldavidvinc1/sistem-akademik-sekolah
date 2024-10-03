<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SiswaResource extends JsonResource
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
            'tanggal_lahir' => $this->tanggal_lahir,
            'tempat_lahir' => $this->tempat_lahir,
            'alamat' => $this->alamat,
            'telepon' => $this->telepon,
            'tanggal_daftar' => $this->tanggal_daftar,
            'status' => $this->status,
            'jenis_kelamin' => $this->jenis_kelamin,
            'jurusan' => new JurusanResource($this->whenLoaded('jurusan')),
            'kelas' => new KelasResource($this->whenLoaded('kelas')),
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'updated_at' => (new Carbon($this->updated_at))->format('Y-m-d'),
        ];
    }
}
