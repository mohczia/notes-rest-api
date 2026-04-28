import response from '../../../utils/response.js';
import ExportService from '../producers/export-services.js';

export const exportNotes = async (req, res) => {
    const { targetEmail } = req.validate;

    const message = {
        userId: req.user.id,
        targetEmail
    };

    await ExportService.sendMessage('export: notes', JSON.stringify(message));
    return response(res, 201, 'permintaan export catatan dalam antrean');
};