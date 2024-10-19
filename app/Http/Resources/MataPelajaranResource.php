<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MataPelajaranResource extends JsonResource
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
            'kode_mata_pelajaran' => $this->kode_mata_pelajaran,
            'nama_mata_pelajaran' => $this->nama_mata_pelajaran,
            'jurusan' => new JurusanResource($this->whenLoaded('jurusan')),
            'kkm' => $this->kkm,
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'updated_at' => (new Carbon($this->updated_at))->format('Y-m-d'),
        ];
    }
}
