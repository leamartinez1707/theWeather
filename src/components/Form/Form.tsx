import { ChangeEvent, useState } from "react";
import { countries } from "../../data/countries";
import styles from './Form.module.css'
import { SearchType } from "../../types";


export default function Form() {

    const [search, setSearch] = useState<SearchType>({
        city: '',
        country: ''
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        })
    }

    return (
        <form className={styles.form}>
            <div>
                <label htmlFor="city">Ciudad:</label>
                <input
                    onChange={handleChange}
                    type="text" id="city" name="city" placeholder="Ciudad" value={search.city} />
            </div>


            <div className={styles.field}>
                <label htmlFor="country">País:</label>
                <select id="country" onChange={handleChange} name="country" value={search.country}>
                    <option value="">-- Selecione un País --</option>
                    {countries.map((country) => (
                        <option key={country.code} value={country.code}>{country.name}</option>
                    ))}
                </select>

            </div>
            <input className={styles.submit} type="submit" value={'Consultar clima'} />
        </form>
    )
}
