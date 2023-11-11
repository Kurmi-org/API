import Rate from '../models/rate.model.js';

//agregar tasa
/*
export const addRate = async (req, res) => {
    try{
        const { increment } = req.body;

        const newRate = new Rate({
            increment
        });

        const rateSaved = await newRate.save();
        res.status(201).json(rateSaved);
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Something goes wrong"});
    }
}
*/

//actualizar tasa

export const updateRate = async (req, res) => {
    const id = '654ee1ba86b3d653c7e357f7'; // ID por defecto
    const { rateValue } = req.body;

    try {
        const rate = await Rate.findById(id);

        if (!rate) {
            return res.status(404).json({ message: 'Rate not found' });
        }

        rate.value = rateValue;

        const updatedRate = await rate.save();

        res.status(200).json(updatedRate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating rate' });
    }
};