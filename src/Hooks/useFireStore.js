import { useEffect, useState } from 'react';
import { db } from '../firebase/config';

const useFireStore = (collection, condition) => {
    const [documents, setDocument] = useState([])
    useEffect(() => {
        let conditionRef = db.collection(collection).orderBy('createdAt')
        if (condition) {
            if (!condition.compareValue || !condition.compareValue.length) {
                return;
            }
            conditionRef = conditionRef.where(condition.fieldName, condition.operator, condition.compareValue)
        }
        const unsubcibe = conditionRef.onSnapshot((snapshot) => {
            const documents = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
            }))
            setDocument(documents)
        })
        return () => {
            unsubcibe()
        }
    }, [collection, condition])
    return documents
}

export default useFireStore;