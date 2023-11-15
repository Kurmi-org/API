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
//mostrar tasa

export const getRate = async (req, res) => {
    try {
        const rate = await Rate.find();
        res.status(200).json(rate);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something goes wrong' });
    }
};


//actualizar tasa

export const updateRate = async (req, res) => {
    const id = '654ee1ba86b3d653c7e357f7'; // ID por defecto
    const update = req.body; // Objeto de actualización

    try {
        const rate = await Rate.findById(id);

        if (!rate) {
            return res.status(404).json({ message: 'Rate not found' });
        }

        // Actualiza los campos del registro con los valores en el objeto de actualización
        for (let key in update) {
            rate[key] = update[key];
        }

        const updatedRate = await rate.save();

        res.status(200).json(updatedRate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating rate' });
    }
};

