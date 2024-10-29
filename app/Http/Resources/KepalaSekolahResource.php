<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class KepalaSekolahResource extends JsonResource
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
            'nama_lengkap' => $this->nama_lengkap,
            'nip' => $this->nip,
            'jenis_kelamin' => $this->jenis_kelamin,
            'tanggal_lahir' => (new Carbon($this->tanggal_lahir))->format('Y-m-d'),
            'tempat_lahir' => $this->tempat_lahir,
            'alamat' => $this->alamat,
            'telepon' => $this->telepon,
            'email' => $this->email,
            'foto' => $this->foto && !(str_starts_with($this->foto, 'http')) ?
            Storage::url($this->foto) : $this->foto,
            'tanda_tangan' => $this->tanda_tangan && !(str_starts_with($this->tanda_tangan, 'http')) ?
            Storage::url($this->tanda_tangan) : $this->tanda_tangan,
        ];
    }
}
