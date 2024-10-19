<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AbsensiResource extends JsonResource
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
            'siswa' => new SiswaResource($this->whenLoaded('siswa')),
            'status_kehadiran' => $this->status_kehadiran,
            'keterangan' => $this->keterangan,
            'tanggal' => (new Carbon($this->tanggal))->format('Y-m-d'),
            'mataPelajaran' => new MataPelajaranResource($this->whenLoaded('mataPelajaran')),
            'kelas' => new KelasResource($this->whenLoaded('kelas')),
            'guru' => new GuruResource($this->whenLoaded('guru')),
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'updated_at' => (new Carbon($this->updated_at))->format('Y-m-d'),
        ];
    }
}
