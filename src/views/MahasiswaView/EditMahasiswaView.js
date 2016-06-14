import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'
import EditMahasiswaForm from '../../components/Mahasiswa/EditMahasiswaForm'

import { getMahasiswaDataByNim, updateMahasiswa } from '../../redux/modules/mahasiswa'
import { getKelas } from '../../redux/modules/kelas'
import { getSemester } from '../../redux/modules/semester'
import { getAkademik } from '../../redux/modules/akademik'

const form = 'editMahasiswaForm'
const fields = ['nim', 'nama', 'email', 'kelas', 'noHp', 'tanggal', 'bulan',
'tahun', 'alamatRumah', 'alamatTinggal', 'semester', 'akademik', 'kompensasi', 'deviceId', 'tahunMasuk']

const mapStateToProps = (state) => ({
  data: state.mahasiswa.data,
  isLoading: state.mahasiswa.isLoading,
  successUpdate: state.mahasiswa.successUpdate,
  onUpdate: state.mahasiswa.onUpdate,
  message: state.mahasiswa.message,
  kelas: state.kelas.data,
  semester: state.semester.data,
  akademik: state.akademik.data
})

export class EditMahasiswaView extends Component {
  static propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
    params: PropTypes.string,
    isLoading: PropTypes.bool,
    successUpdate: PropTypes.bool,
    message: PropTypes.string,
    kelas: PropTypes.object,
    semester: PropTypes.object,
    akademik: PropTypes.object
  }

  componentWillMount () {
    this.props.dispatch(getMahasiswaDataByNim(this.props.params.nim))
    this.props.dispatch(getKelas())
    this.props.dispatch(getSemester())
    this.props.dispatch(getAkademik())
  }

  ubahData = () => {
    var tanggal = this.props.values.tanggal
    var bulan = this.props.values.bulan
    var tahun = this.props.values.tahun
    var tanggalLahir = tahun + '-' + bulan + '-' + tanggal
    var nim = this.props.values.nim
    var mahasiswa = {
      nama_mhs: this.props.values.nama,
      email: this.props.values.email,
      tanggal_lahir: tanggalLahir,
      alamat_rumah: this.props.values.alamatRumah,
      alamat_tinggal: this.props.values.alamatRumah,
      tahun_masuk: this.props.values.tahunMasuk,
      no_hp: this.props.values.noHp,
      kompensasi: this.props.values.kompensasi,
      id_kelas: this.props.values.kelas,
      id_semester: this.props.values.semester,
      id_akademik: this.props.values.akademik,
      device_id: this.props.values.deviceId
    }
    console.log(mahasiswa)
    this.props.dispatch(updateMahasiswa(nim, mahasiswa))
  }
  render () {
    const {fields: {nim, nama, email, kelas, noHp, tanggal, bulan, tahun, alamatRumah,
     alamatTinggal, semester, akademik, kompensasi, deviceId, tahunMasuk}} = this.props
    var kelasData = this.props.kelas
    var semesterData = this.props.semester
    var akademikData = this.props.akademik
    var tanggalLahirOption = []
    var tahunLahirOption = []
    var tahunMasukOption = []
    var kelasOption = []
    var semesterOption = []
    var akademikOption = []
    if (kelasData && semesterData && akademikData) {
      console.log(kelasData)
      for (var i = 1; i <= 31; i++) {
        tanggalLahirOption.push(<option value={i < 10 ? '0' + i : i} key={i}>{i < 10 ? '0' + i : i}</option>)
      }
      for (var j = 1950; j <= 1995; j++) {
        tahunLahirOption.push(<option value={j} key={j}>{j}</option>)
      }
      for (var k = 2011; k <= 2016; k++) {
        tahunMasukOption.push(<option value={k} key={k}>{k}</option>)
      }
      for (var x = 0; x < kelasData.data.length; x++) {
        kelasOption.push(<option value={kelasData.data[x].kode}>{kelasData.data[x].kelas}</option>)
      }
      for (var y = 0; y < semesterData.data.length; y++) {
        semesterOption.push(<option value={semesterData.data[y].kode}>{semesterData.data[y].semester}</option>)
      }
      for (var z = 0; z < akademikData.data.length; z++) {
        akademikOption.push(<option value={akademikData.data[z].kode}>{akademikData.data[z].akademik}</option>)
      }
    }

    return (
      <div>
        <Menu />
        <div className='main-panel'>
          <TopMenu />
          <div className='content'>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='card'>
                    <div className='header'>
                      <legend>Ubah Data Mahasiswa</legend>
                    </div>
                    <div className='content'>
                      <div className='row' onSubmit={this.handleSubmit}>
                        <div className='col-md-4'>
                          <div className='form-group'>
                            <label>NIM</label>
                            <input
                              {...nim}
                              type='text'
                              className='form-control' />
                          </div>
                        </div>
                        <div className='col-md-4'>
                          <div className='form-group'>
                            <label>nama</label>
                            <input
                              {...nama}
                              type='text'
                              className='form-control' />
                          </div>
                        </div>
                        <div className='col-md-4'>
                          <div className='form-group'>
                            <label>Email</label>
                            <input
                              {...email}
                              type='text'
                              className='form-control' />
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Kelas</label>
                            <select
                              {...kelas}
                              className='form-control'>
                              {kelasOption}
                            </select>
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Semester</label>
                            <select
                              {...semester}
                              className='form-control'>
                              {semesterOption}
                            </select>
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Akademik</label>
                            <select
                              {...akademik}
                              className='form-control'>
                              {akademikOption}
                            </select>
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Tahun Masuk</label>
                            <input
                              {...tahunMasuk}
                              className='form-control' />
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Nomor Handphone</label>
                            <input
                              {...noHp}
                              type='text'
                              className='form-control' />
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Tanggal Lahir</label>
                            <select
                              {...tanggal}
                              className='form-control'>
                              {tanggalLahirOption}
                            </select>
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Bulan Lahir</label>
                            <select
                              {...bulan}
                              className='form-control'>
                              <option value=''>Bulan</option>
                              <option value='01'>Januari</option>
                              <option value='02'>Februari</option>
                              <option value='03'>Maret</option>
                              <option value='04'>April</option>
                              <option value='05'>Mei</option>
                              <option value='06'>Juni</option>
                              <option value='07'>Juli</option>
                              <option value='08'>Agustus</option>
                              <option value='09'>September</option>
                              <option value='10'>Oktober</option>
                              <option value='11'>November</option>
                              <option value='12'>Desember</option>
                            </select>
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Tahun Lahir</label>
                            <select
                              {...tahun}
                              className='form-control'>
                              {tahunLahirOption}
                            </select>
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='form-group'>
                            <label>Alamat Rumah</label>
                            <input
                              {...alamatRumah}
                              type='text'
                              className='form-control' />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='form-group'>
                            <label>Alamat Tinggal</label>
                            <input
                              {...alamatTinggal}
                              type='text'
                              className='form-control' />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='form-group'>
                            <label>Device ID</label>
                            <input
                              {...deviceId}
                              type='text'
                              className='form-control' />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='form-group'>
                            <label>Jumlah Kompensasi</label>
                            <input
                              {...kompensasi}
                              type='text'
                              className='form-control' />
                          </div>
                        </div>
                        <div className='footer text-center'>
                          <button
                            type='submit'
                            className='btn btn-fill btn-info btn-wd'
                            onClick={this.props.handleSubmit(this.ubahData)}>Simpan</button>
                        </div>
                      </div>
                    </div>
                    <div
                      data-notify='container'
                      className={'col-xs-11 col-sm-4 alert alert-info alert-with-icon animated fadeInDown' + (this.props.onUpdate ? '' : ' hide')}
                      role='alert'
                      data-notify-position='bottom-center'
                      style={{display: 'inline-block',
                        margin:' 0 auto',
                        position: 'fixed',
                        transition: 'all 0.5s ease-in-out',
                        zIndex: '1031',
                        bottom: '20',
                        left: '0',
                        right: '0'}}>
                      <button
                        type='button'
                        aria-hidden='true'
                        className='close'
                        data-notify='dismiss'
                        style={{position: 'absolute',
                          right: '10',
                          top: '50%',
                          marginTop: '-13',
                          zIndex: '1033'}}>×</button>
                        <span data-notify='icon' className='pe-7s-gift'></span>
                        <span data-notify='title'></span>
                        <span data-notify='message'>
                        <b>{this.props.successUpdate ? 'Berhasil perbarui data' : 'Gagal perbarui data'}</b></span>
                        <a href='#'
                          target='_blank'
                          data-notify='url'></a>
                        </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(reduxForm({
  form: form,
  fields
})(EditMahasiswaView))
