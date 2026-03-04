import { nanoid } from "nanoid";
import notes from "./notes.js";

export const createNote = (req, res, next) => {
  const { title = 'untitle', tags, body } = req.body;
  const id = nanoid(16);
  const createAt = new Date().toISOString();
  const updateAd = createAt;
 
  const newNote = { id, tags, body, title, createAt, updateAd };
  notes.push(newNote);
  
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    return res.status(201).json({
      status : 'success',
      message : 'Catatan berhasil ditambahkan',
      data : {
        noteId: id
      }
    });
  } else {
    return res.status(500).json({
      status : 'fail',
      message : 'Catatan gagal ditambahkan',
    });
  }
};


export const getNotes = (req, res) => {
  return res.json({
    status : 'success',
    data : { notes }
  });
};

export const getNoteById = (req, res) => {
  const { id } = req.params;
  const note = notes.find((n) => n.id === id);

  if (note) {
    return res.json({
      status : 'success',
      data : { note }
    });
  }else {
    return res.status(404).json({
      status : 'fail',
      message : 'catatan tidak ditemukan'
    });
  }
};

export const editNoteById = (req, res) => {
  const { id } = req.params;
  const { title, tags, body} = req.body;
  const updateAd = new Date().toISOString();
  const index =  notes.findIndex((n) => n.id === id);

  if (index !== -1 ) {
    notes [index] = {...notes[index], title, tags, body, updateAd};
    return res.json({
      status : 'success',
      message : 'catatan berhasil diperbarui',
    });
  } else {
    return res.status(404).json({
      status : 'fail',
      message : 'gagal memperbarui catatan. id tidak ditemukan'
    });
  }

};

export const deleteNoteById = (req,res) => {
  const { id } = req.params;
  const index = notes.findIndex((n) => n.id === id);

  if ( index !== -1) {
    notes.splice(index, 1);
    return res.json({
      status : 'success',
      message : 'catatan berhasil dihapus'
    });
  } else {
    return res.sta(404).json({
      status : 'fail',
      message : 'catatan gagal dihapus. id tidak ditemukan'
    })
  }
};